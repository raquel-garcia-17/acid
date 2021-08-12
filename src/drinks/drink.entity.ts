import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('drinks')
export class DrinkEntity {

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