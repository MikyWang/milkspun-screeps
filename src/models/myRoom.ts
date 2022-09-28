import { MyCreepManager } from "myCreepManager";
import { HarvesterNormal } from "./harvesterNormal";

export class MyRoom {

    private room: Room;
    private harvesterNormalManager: MyCreepManager<HarvesterNormal>;

    public spawns: StructureSpawn[] = [];

    public get Room(): Room { return this.room; }
    public get RoomLevel(): number { return this.room.controller?.level || 1; }

    constructor(room: Room) {
        this.room = room;
        this.harvesterNormalManager = new MyCreepManager<HarvesterNormal>(this, 'HarvesterNormal', HarvesterNormal);
        this.harvesterNormalManager.MyCreepMaxCount = Math.round(5 / this.RoomLevel);
    }

    public update(): void {
        this.harvesterNormalManager.MyCreepMaxCount = Math.round(5 / this.RoomLevel);
        this.harvesterNormalManager.update();
    }

}