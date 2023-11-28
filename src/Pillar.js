import { Mesh } from 'three';
import { cm1, geo, mat } from './common';
import { Stuff } from './Stuff';

export class Pillar extends Stuff {
    constructor(info) {
        super(info);

        this.geometry = geo.pillar;
        this.material = mat.pillar;

        this.width = this.geometry.parameters.width;
        this.height = this.geometry.parameters.height;
        this.depth = this.geometry.parameters.depth;

        this.mesh = new Mesh(this.geometry, this.material);
        this.mesh.position.set(this.x, this.y, this.z);
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;

        cm1.scene.add(this.mesh);

        this.setCannonBody();
    }
}
