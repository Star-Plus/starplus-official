<script>
    import { T, useTask } from "@threlte/core";
    import { OrbitControls, Float, Stars, Text, HTML } from "@threlte/extras";
    import { spring } from "svelte/motion";

    let { scrollY = 0 } = $props();

    let rotation = $state(0);

    useTask((delta) => {
        rotation += delta * 0.2;
    });
</script>

<!-- Camera -->
<T.PerspectiveCamera
    makeDefault
    position={[0, 0, 10 + scrollY * 0.01]}
    fov={50}
>
    <!-- <OrbitControls enableZoom={false} enablePan={false} /> -->
</T.PerspectiveCamera>

<!-- Lights -->
<T.AmbientLight intensity={0.5} />
<T.DirectionalLight position={[10, 10, 5]} intensity={1.5} color="#A78BFA" />
<T.PointLight position={[-10, -10, -5]} intensity={1} color="#F472B6" />

<!-- Environment -->
<Stars
    radius={100}
    depth={50}
    count={5000}
    factor={4}
    saturation={0}
    fade
    speed={1}
/>

<!-- Hero Object -->
<Float floatIntensity={2} rotationIntensity={1} speed={2}>
    <T.Group rotation.y={rotation} rotation.z={rotation * 0.5}>
        <T.Mesh position={[0, 0, 0]}>
            <T.IcosahedronGeometry args={[2, 0]} />
            <T.MeshStandardMaterial
                color="#6D28D9"
                wireframe
                emissive="#6D28D9"
                emissiveIntensity={2}
            />
        </T.Mesh>

        <!-- Inner Core -->
        <T.Mesh position={[0, 0, 0]}>
            <T.OctahedronGeometry args={[1, 0]} />
            <T.MeshStandardMaterial
                color="#F472B6"
                emissive="#F472B6"
                emissiveIntensity={5}
                transparent
                opacity={0.8}
            />
        </T.Mesh>
    </T.Group>
</Float>

<!-- Fog for depth -->
<T.Fog args={["#0B0B0F", 5, 50]} />
