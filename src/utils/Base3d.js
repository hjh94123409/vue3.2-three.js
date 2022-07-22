import * as THREE from "three";
import {
    RGBELoader
} from "three/examples/jsm/loaders/RGBELoader";
//导入控制器，轨道控制器
import {
    OrbitControls
} from "three/examples/jsm/controls/OrbitControls";

//导入模型解析器
import {
    GLTFLoader
} from 'three/examples/jsm/loaders/GLTFLoader'

import {
    DRACOLoader
} from "three/examples/jsm/loaders/DRACOLoader";

class Base3d {
    constructor(selector, onFinish) {
        this.container = document.querySelector(selector);
        this.camera;
        this.scene;
        this.renderer;
        this.controls;
        this.model;
        this.manager;
        this.plate;
        this.animateAction;
        this.mixer;
        this.onFinish = onFinish;
        this.clock = new THREE.Clock();
        this.init();
        this.animate();
        this.progressFn;
    }

    onProgress(fn) { 
        this.progressFn = fn
    }

    init() {
        //初始化场景
        this.initScene();
        //初始化相机
        this.initCamera();
        //初始化渲染器
        this.initRenderer();
        //使用控制器
        // this.initControls();
        //添加物体
        this.addMesh();

        window.addEventListener("resize", this.windowResize.bind(this));

        window.addEventListener("mousewheel", this.mouseWheel.bind(this));
    }

    initScene() {
        this.scene = new THREE.Scene();
        this.setEnvMap("000"); //环境贴图
    }

    initCamera() {
        this.camera = new THREE.PerspectiveCamera(
            45, // 摄像头角度
            window.innerWidth / window.innerHeight, //比例
            0.25, //摄像头能看到最近距离
            200 //摄像头能看到最远距离
        );
        this.camera.position.set(-1.8, 0.6, 2.7);
    }
    initRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            antialias: true, //坑锯齿
        });
        //设置屏幕像素比
        this.renderer.setPixelRatio(window.devicePixelRatio);
        //渲染的尺寸大小
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        //色调映射
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;

        this.renderer.toneMappingExposure = 2;
        this.container.appendChild(this.renderer.domElement);
    }
    setEnvMap(hdr) {
        new RGBELoader()
            .setPath("./files/hdr/")
            .load(`${hdr}.hdr`, (texture) => {
                texture.mapping = THREE.EquirectangularReflectionMapping;
                this.scene.background = texture;
                this.scene.environment = texture;
            });
    }
    render() {
        const delta = this.clock.getDelta();
        this.mixer && this.mixer.update(delta);
        this.renderer.render(this.scene, this.camera);
    }
    animate() {
        this.renderer.setAnimationLoop(this.render.bind(this));
    }
    initControls() {
        this.controls = new OrbitControls(
            this.camera,
            this.renderer.domElement
        );
    }

    setModel(modelName) {

        return new Promise((resolve, reject) => {
            const loader = new GLTFLoader();
            const dracoLoader = new DRACOLoader();
            dracoLoader.setDecoderPath("files/dram/");
            dracoLoader.setDecoderConfig({
                type: 'js'
            })
            loader.setDRACOLoader(dracoLoader);
            loader.setPath("files/gltf/");
            loader.load(
                modelName,
                (gltf) => {
                    // console.log(modelName, gltf);
                    this.model && this.model.removeFromParent();
                    this.model = gltf.scene.children[0];
                    if (modelName === "bag2.glb" && !this.plate) {
                        this.plate = gltf.scene.children[5];
                        // this.scene.add(this.plate)
                        //添加所有场景
                        this.scene.add(gltf.scene);
                        //调整摄像头
                        this.camera = gltf.cameras[0];
                        //调用动画混合器
                        this.mixer = new THREE.AnimationMixer(
                            gltf.scene.children[1]
                        );
                        this.animateAction = this.mixer.clipAction(
                            gltf.animations[0]
                        );
                        //设置动画时长 s
                        this.animateAction.setDuration(20);
                        this.animateAction.setLoop(THREE.LoopOnce);
                        //设置播放完成之后停止
                        this.animateAction.clampWhenFinished = true;
                        // this.animateAction.play()
                        //设置灯光
                        this.spotlight1 = gltf.scene.children[2].children[0];
                        this.spotlight1.intensity = 1;
                        this.spotlight2 = gltf.scene.children[3].children[0];
                        this.spotlight2.intensity = 1;
                        this.spotlight3 = gltf.scene.children[4].children[0];
                        this.spotlight3.intensity = 1;
                    }
                    this.scene.add(this.model);
                    // this.windowResize();
                    this.camera.aspect = window.innerWidth / window.innerHeight;
                    this.camera.updateProjectionMatrix();
                    resolve(modelName + "模型添加成功");
                },
                (e) => {
                    // console.log(e);
                    this.progressFn(e);
                }
            );
        });
    }
    async addMesh() {
        let result = await this.setModel("bag2.glb");
        this.onFinish(result);
    }
    windowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
    mouseWheel(e) {
        let timeScale = e.deltaY > 0 ? 1 : -1;
        this.animateAction.setEffectiveTimeScale(timeScale);
        this.animateAction.paused = false;
        this.animateAction.play();
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
        this.timeoutId = setTimeout(() => {
            this.animateAction.halt(0.5);
        }, 300);
    }
}

export default Base3d;