type MyCreepConstructor<T extends IMyCreepBase> = { new(owner: IMyCreepManager, name: string): T }
type MyCreepType = 'HarvesterNormal' | 'BuilderNormal';

interface IMyCreepManager {
    get MyCreeps(): IMyCreepBase[];
    get MyCreepMaxCount(): number;
    set MyCreepMaxCount(value: number);
    update(): void;
    createMyCreep(constructor: MyCreepConstructor<IMyCreepBase>, owner: IMyCreepManager, name: string): IMyCreepBase;
    findEnengySaver(): StructureSpawn;
    findSpawner(): StructureSpawn;
}

interface IMyCreepBase {
    get IsAlive(): boolean;
    get BornEnergy(): number;
    get Name(): string;
    get Role(): MyCreepType;
    update(): void;
}

interface CreepMemory {
    role: MyCreepType;
}
