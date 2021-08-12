import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('foods')
export class FoodEntity {

    @PrimaryGeneratedColumn()
    id:number;

    @Column({length:50})
    name:string;

    @Column({length:50})
    price:string;

    @Column({length:200})
    type:string;

    @Column({length:50})
    images:string;

}
