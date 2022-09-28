import { MyRoom } from "models/myRoom";

export class MyCreepManager<T extends IMyCreepBase> implements IMyCreepManager {

    private role: MyCreepType;
    private myRoom: MyRoom;
    private myCreepConstructor: MyCreepConstructor<T>;
    private myCreeps: T[];
    private myCreepMaxCount: number;

    public get MyCreeps(): T[] { return this.myCreeps; }
    public get MyCreepMaxCount(): number { return this.myCreepMaxCount; }
    public set MyCreepMaxCount(value: number) { this.myCreepMaxCount = value; }

    constructor(myRoom: MyRoom, role: MyCreepType, constructor: MyCreepConstructor<T>) {
        this.role = role;
        this.myCreeps = [];
        this.myRoom = myRoom;
        this.myCreepConstructor = constructor;
        this.myCreepMaxCount = 0;
        this.initMyCreeps();
    }

    private initMyCreeps() {
        _.forEach(Game.creeps, creep => {
            if (creep.memory.role == this.role) {
                var myCreep = this.createMyCreep(this.myCreepConstructor, this, creep.name);
                this.myCreeps.push(myCreep);
            }
        });
        console.log(this.myCreeps.length);
    }

    public update(): void {
        if (this.MyCreeps.length < this.MyCreepMaxCount) {
            var myCreep = this.createMyCreep(this.myCreepConstructor, this, `${this.role}[${Game.time}]`);
            this.myCreeps.push(myCreep);
        }
        _.forEach(this.MyCreeps, myCreep => {
            myCreep.update();
        });
    }

    public createMyCreep(constructor: MyCreepConstructor<T>, owner: IMyCreepManager, name: string) {
        return new constructor(owner, name);
    }

    public findEnengySaver(): StructureSpawn {
        this.myRoom.spawns.sort((left, right) => right.store.energy - left.store.energy);
        return this.myRoom.spawns[this.myRoom.spawns.length - 1];
    }

    public findSpawner(): StructureSpawn {
        this.myRoom.spawns.sort((left, right) => right.store.energy - left.store.energy);
        return this.myRoom.spawns[0];
    }

}