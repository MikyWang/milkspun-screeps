import { MyCreepBase } from "./myCreepBase";

export class HarvesterNormal extends MyCreepBase {
    protected role: MyCreepType;
    public static readonly bodys: BodyPartConstant[] = [WORK, CARRY, MOVE];
    protected bornEnergy: number = 200;
    private source?: Source;

    constructor(owner: IMyCreepManager, name: string) {
        super(owner, name, HarvesterNormal.bodys);
        this.role = 'HarvesterNormal';
    }

    public override update(): void {
        super.update();
        if (!this.IsAlive) return;
        if (this.creep!.store.getFreeCapacity() > 0) {
            if (!this.source) this.source = this.creep!.room.find(FIND_SOURCES)[0];
            if (this.creep!.harvest(this.source) == ERR_NOT_IN_RANGE) {
                this.creep!.moveTo(this.source, { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        } else {
            var spawn = this.Owner.findEnengySaver();
            if (this.creep!.transfer(spawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                this.creep!.moveTo(spawn, { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        }
    }

}