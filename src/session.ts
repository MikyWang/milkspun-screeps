import { MyRoom } from "./models/myRoom";

export class Session {

    private static instance: Session;

    public static get Instance(): Session {
        if (!this.instance) {
            this.instance = new Session();
        }
        return this.instance;
    };

    public roomList: MyRoom[] = [];

    public init(): void {
        _.filter(Game.spawns, spawn => {
            var existRoom = _.find(this.roomList, myRoom => myRoom.Room == spawn.room);
            if (!existRoom) {
                existRoom = new MyRoom(spawn.room);
            }
            existRoom.spawns.push(spawn);
            this.roomList.push(existRoom);
        });
        console.log("初始化Session成功!");
    }

    public update(): void {
        _.forEach(this.roomList, myRoom => {
            myRoom.update();
        });
    }

}