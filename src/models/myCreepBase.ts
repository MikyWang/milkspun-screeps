import { MyCreepManager } from "myCreepManager";

export abstract class MyCreepBase implements IMyCreepBase {
    protected creep?: Creep;
    protected abstract bornEnergy: number;
    protected name: string;
    protected owner: IMyCreepManager;
    protected bodys: BodyPartConstant[];
    protected abstract role: MyCreepType;

    public get IsAlive(): boolean { return this.creep ? true : false; }
    public get BornEnergy(): number { return this.bornEnergy; }
    public get Name(): string { return this.name; }
    public get Role(): MyCreepType { return this.role; }
    public get Owner(): IMyCreepManager { return this.owner; }

    constructor(owner: IMyCreepManager, name: string, bodys: BodyPartConstant[]) {
        this.creep = Game.creeps[name];
        this.name = name;
        this.owner = owner;
        this.bodys = bodys;
    }
    public update(): void {
        if (!this.IsAlive) {
            if (!Game.creeps[this.name]) {
                var spawn = this.owner.findSpawner();
                if (spawn.spawnCreep(this.bodys, this.name, { memory: { role: this.Role } }) == OK) {
                    this.creep = Game.creeps[this.Name];
                }
            } else {
                this.creep = Game.creeps[this.Name];
            }
        }
    }
}