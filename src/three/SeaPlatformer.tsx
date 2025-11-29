import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const PLAYER_HEIGHT = 1.6;
const MOVE_SPEED = 6;
const JUMP_SPEED = 6.5;
const GRAVITY = 18;
const INTERACT_DISTANCE = 3;

const npcs = [
  {
    id: 'fisher-1',
    name: 'Andrew',
    position: new THREE.Vector3(-8, 0, 4),
    lines: [
      'Storms rise fast out here. Do you trust the One who sleeps through them?',
      'These nets are empty, but the Teacher fills them when He speaks.'
    ]
  },
  {
    id: 'fisher-2',
    name: 'Salome',
    position: new THREE.Vector3(-10, 0, -3),
    lines: ['We watched Him calm the waters. Even the wind listened.', 'Fish obey His word. Do you?']
  },
  {
    id: 'boatman',
    name: 'Boatman',
    position: new THREE.Vector3(6, 0, -6),
    lines: ['Hop aboard. The lake is His, too.', 'Keep your balance—the deck is wet.']
  }
];

type KeyState = {
  forward: boolean;
  back: boolean;
  left: boolean;
  right: boolean;
  jump: boolean;
  interact: boolean;
};

function useKeys(onInteract: () => void) {
  const keys = useRef<KeyState>({ forward: false, back: false, left: false, right: false, jump: false, interact: false });

  useEffect(() => {
    const handleDown = (e: KeyboardEvent) => {
      if (e.code === 'KeyW') keys.current.forward = true;
      if (e.code === 'KeyS') keys.current.back = true;
      if (e.code === 'KeyA') keys.current.left = true;
      if (e.code === 'KeyD') keys.current.right = true;
      if (e.code === 'Space') keys.current.jump = true;
      if (e.code === 'KeyE') {
        keys.current.interact = true;
        onInteract();
      }
    };
    const handleUp = (e: KeyboardEvent) => {
      if (e.code === 'KeyW') keys.current.forward = false;
      if (e.code === 'KeyS') keys.current.back = false;
      if (e.code === 'KeyA') keys.current.left = false;
      if (e.code === 'KeyD') keys.current.right = false;
      if (e.code === 'Space') keys.current.jump = false;
      if (e.code === 'KeyE') keys.current.interact = false;
    };
    window.addEventListener('keydown', handleDown);
    window.addEventListener('keyup', handleUp);
    return () => {
      window.removeEventListener('keydown', handleDown);
      window.removeEventListener('keyup', handleUp);
    };
  }, [onInteract]);

  return keys;
}

function getGroundHeight(x: number, z: number): number {
  // Shore on the left (x < -6) slightly raised
  let height = 0;
  if (x < -6) height = 0.05;

  // Boat deck area
  const boatCenter = new THREE.Vector3(6, 0, -6);
  const halfSize = { x: 2, z: 1 };
  if (Math.abs(x - boatCenter.x) <= halfSize.x && Math.abs(z - boatCenter.z) <= halfSize.z) {
    height = Math.max(height, 0.25);
  }

  return height;
}

function randomChoice<T>(items: T[]): T | undefined {
  return items[Math.floor(Math.random() * items.length)];
}

export default function SeaPlatformer() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [nearbyNpc, setNearbyNpc] = useState<(typeof npcs)[number] | null>(null);
  const [dialogue, setDialogue] = useState<string | null>(null);
  const [activeSpeaker, setActiveSpeaker] = useState<string | null>(null);
  const interactRequested = useRef(false);
  const pointerLocked = useRef(false);

  const keys = useKeys(() => {
    interactRequested.current = true;
  });

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0b1221);
    scene.fog = new THREE.Fog(0x0b1221, 20, 120);

    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 500);
    camera.position.set(0, PLAYER_HEIGHT, 8);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Lights
    const hemi = new THREE.HemisphereLight(0xbcdffb, 0x1e293b, 0.6);
    scene.add(hemi);
    const dir = new THREE.DirectionalLight(0xffffff, 0.8);
    dir.position.set(5, 12, -5);
    scene.add(dir);

    // Water plane
    const waterGeo = new THREE.PlaneGeometry(200, 200, 120, 120);
    waterGeo.rotateX(-Math.PI / 2);
    const basePositions = (waterGeo.attributes.position.array as Float32Array).slice();
    const waterMat = new THREE.MeshPhongMaterial({ color: 0x21507a, shininess: 80, transparent: true, opacity: 0.95, flatShading: true });
    const water = new THREE.Mesh(waterGeo, waterMat);
    scene.add(water);

    // Shore
    const shoreGeo = new THREE.PlaneGeometry(80, 80);
    shoreGeo.rotateX(-Math.PI / 2);
    const shoreMat = new THREE.MeshLambertMaterial({ color: 0x8b6f4e });
    const shore = new THREE.Mesh(shoreGeo, shoreMat);
    shore.position.set(-10, 0.01, 0);
    scene.add(shore);

    // Boat
    const boat = new THREE.Mesh(new THREE.BoxGeometry(4, 0.4, 2), new THREE.MeshPhongMaterial({ color: 0x6b4c2f, flatShading: true }));
    boat.position.set(6, 0.2, -6);
    scene.add(boat);

    const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.1, 2.5, 8), new THREE.MeshPhongMaterial({ color: 0xd9d3c0 }));
    mast.position.set(6, 1.5, -6);
    scene.add(mast);

    // NPCs
    const npcMeshes: Record<string, THREE.Object3D> = {};
    npcs.forEach((npc) => {
      const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.25, 0.6, 6, 12), new THREE.MeshStandardMaterial({ color: 0xffe19c }));
      body.position.copy(npc.position).setY(0.6);
      const head = new THREE.Mesh(new THREE.SphereGeometry(0.18, 12, 12), new THREE.MeshStandardMaterial({ color: 0xf1c27d }));
      head.position.copy(npc.position).setY(1.2);
      const group = new THREE.Group();
      group.add(body);
      group.add(head);
      scene.add(group);
      npcMeshes[npc.id] = group;
    });

    // Rain particles
    const rainCount = 1200;
    const rainPositions = new Float32Array(rainCount * 3);
    const rainSpeeds = new Float32Array(rainCount);
    for (let i = 0; i < rainCount; i++) {
      rainPositions[i * 3] = (Math.random() - 0.5) * 140;
      rainPositions[i * 3 + 1] = Math.random() * 30 + 5;
      rainPositions[i * 3 + 2] = (Math.random() - 0.5) * 140;
      rainSpeeds[i] = Math.random() * 10 + 15;
    }
    const rainGeo = new THREE.BufferGeometry();
    rainGeo.setAttribute('position', new THREE.BufferAttribute(rainPositions, 3));
    const rainMat = new THREE.PointsMaterial({ color: 0xbfe3ff, size: 0.08, transparent: true, opacity: 0.6 });
    const rain = new THREE.Points(rainGeo, rainMat);
    scene.add(rain);

    const clock = new THREE.Clock();
    const playerPos = new THREE.Vector3(0, PLAYER_HEIGHT, 8);
    const velocity = new THREE.Vector3();
    const camDir = new THREE.Vector3();
    let yaw = 0;
    let pitch = 0;

    const onMouseMove = (e: MouseEvent) => {
      if (!pointerLocked.current) return;
      const moveX = e.movementX || 0;
      const moveY = e.movementY || 0;
      yaw -= moveX * 0.0025;
      pitch -= moveY * 0.002;
      pitch = Math.max(-Math.PI / 2 + 0.01, Math.min(Math.PI / 2 - 0.01, pitch));
    };

    const onPointerLockChange = () => {
      pointerLocked.current = document.pointerLockElement === renderer.domElement;
    };

    renderer.domElement.addEventListener('click', () => {
      renderer.domElement.requestPointerLock();
    });
    document.addEventListener('pointerlockchange', onPointerLockChange);
    window.addEventListener('mousemove', onMouseMove);

    const onResize = () => {
      if (!mountRef.current) return;
      const { clientWidth, clientHeight } = mountRef.current;
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(clientWidth, clientHeight);
    };
    window.addEventListener('resize', onResize);
    onResize();

    const updateWaves = (time: number) => {
      const pos = waterGeo.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < pos.count; i++) {
        const ix = i * 3;
        const ox = basePositions[ix];
        const oz = basePositions[ix + 2];
        pos.array[ix + 1] = Math.sin(time * 1.2 + ox * 0.4 + oz * 0.25) * 0.15 + Math.cos(time * 0.6 + ox * 0.2) * 0.08;
      }
      pos.needsUpdate = true;
      waterGeo.computeVertexNormals();
    };

    const updateRain = (delta: number) => {
      const pos = rain.geometry.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < rainCount; i++) {
        let y = pos.array[i * 3 + 1];
        y -= rainSpeeds[i] * delta;
        if (y < 0) {
          y = Math.random() * 30 + 10;
          pos.array[i * 3] = (Math.random() - 0.5) * 140;
          pos.array[i * 3 + 2] = (Math.random() - 0.5) * 140;
        }
        pos.array[i * 3 + 1] = y;
      }
      pos.needsUpdate = true;
    };

    const getNearbyNpc = (): (typeof npcs)[number] | null => {
      let closest: (typeof npcs)[number] | null = null;
      let minDist = INTERACT_DISTANCE + 1;
      npcs.forEach((npc) => {
        const dist = playerPos.distanceTo(npc.position.clone().setY(playerPos.y));
        if (dist < minDist && dist < INTERACT_DISTANCE) {
          closest = npc;
          minDist = dist;
        }
      });
      return closest;
    };

    const animate = () => {
      const delta = Math.min(0.05, clock.getDelta());
      const time = clock.elapsedTime;

      updateWaves(time);
      updateRain(delta);

      // Movement direction
      camDir.set(0, 0, 0);
      if (keys.current.forward) camDir.z -= 1;
      if (keys.current.back) camDir.z += 1;
      if (keys.current.left) camDir.x -= 1;
      if (keys.current.right) camDir.x += 1;
      if (camDir.lengthSq() > 0) camDir.normalize();

      const forward = new THREE.Vector3(Math.sin(yaw), 0, Math.cos(yaw));
      const right = new THREE.Vector3(Math.cos(yaw), 0, -Math.sin(yaw));
      const move = new THREE.Vector3();
      move.addScaledVector(forward, camDir.z).addScaledVector(right, camDir.x);
      if (move.lengthSq() > 0) move.normalize();
      move.multiplyScalar(MOVE_SPEED * delta);

      playerPos.add(move);

      // Gravity and jump
      velocity.y -= GRAVITY * delta;
      if (keys.current.jump && Math.abs(velocity.y) < 0.01) {
        velocity.y = JUMP_SPEED;
      }
      playerPos.y += velocity.y * delta;

      const ground = getGroundHeight(playerPos.x, playerPos.z) + PLAYER_HEIGHT;
      if (playerPos.y < ground) {
        playerPos.y = ground;
        velocity.y = 0;
      }

      camera.position.copy(playerPos);
      camera.rotation.set(pitch, yaw, 0);

      // NPC proximity and dialogue
      const closeNpc: (typeof npcs)[number] | null = getNearbyNpc();
      if (closeNpc?.id !== nearbyNpc?.id) {
        setNearbyNpc(closeNpc ?? null);
      }

      if (interactRequested.current && closeNpc) {
        const line = randomChoice(closeNpc.lines) ?? '...';
        setActiveSpeaker(closeNpc.name);
        setDialogue(line);
      }
      interactRequested.current = false;

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };

    let animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('pointerlockchange', onPointerLockChange);
      renderer.dispose();
      waterGeo.dispose();
      shoreGeo.dispose();
      (waterMat as THREE.Material).dispose();
      (shoreMat as THREE.Material).dispose();
      boat.geometry.dispose();
      (boat.material as THREE.Material).dispose();
      mast.geometry.dispose();
      (mast.material as THREE.Material).dispose();
      rainGeo.dispose();
      (rainMat as THREE.Material).dispose();
      Object.values(npcMeshes).forEach((group) => {
        group.traverse((child: THREE.Object3D) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            (mesh.geometry as THREE.BufferGeometry).dispose();
            (mesh.material as THREE.Material).dispose();
          }
        });
      });
      renderer.domElement?.remove();
    };
  }, []);

  return (
    <div className="relative h-[80vh] w-full overflow-hidden rounded-2xl border border-slate-800/60 bg-slate-950 shadow-xl shadow-amber-200/10">
      <div ref={mountRef} className="absolute inset-0" />
      <div className="pointer-events-none absolute left-4 top-4 space-y-1 rounded-xl bg-slate-900/70 px-4 py-3 text-sm text-amber-50 shadow-lg shadow-amber-200/10 backdrop-blur">
        <p className="font-semibold">Sea of Galilee 3D Demo</p>
        <p className="text-xs text-amber-100/80">Click to lock mouse • WASD move • Space jump • E talk</p>
        {nearbyNpc ? (
          <p className="text-xs text-amber-200/90">Press E to speak with {nearbyNpc.name}</p>
        ) : (
          <p className="text-xs text-slate-300/80">Walk on water, board the boat, visit the shore.</p>
        )}
      </div>
      {dialogue ? (
        <div className="pointer-events-none absolute bottom-4 left-1/2 w-[90%] max-w-2xl -translate-x-1/2 rounded-xl border border-amber-200/40 bg-slate-900/80 px-4 py-3 text-amber-50 shadow-lg shadow-amber-200/20 backdrop-blur">
          <p className="text-xs uppercase tracking-[0.16em] text-amber-200/80">{activeSpeaker ?? 'Voice'}</p>
          <p className="text-base">{dialogue}</p>
        </div>
      ) : null}
    </div>
  );
}
