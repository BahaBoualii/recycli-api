import { BoostOptions } from "src/enums/boost.options.enum";
import { CitiesEnum } from "src/enums/cities.enum";
import { MaterialType } from "src/enums/material.type.enum";
import { QuantityMetricsEnum } from "src/enums/quantity.metrics.enum";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

@Entity()
export class Post {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'enum',
        enum: MaterialType,
    })
    material_type: string;

    @Column()
    quantity: number

    @Column({
        type: 'enum',
        enum: QuantityMetricsEnum
    })
    metrics: string;

    @Column()
    price: number;

    @Column({
        type: 'enum',
        enum: CitiesEnum
    })
    city: string;

    @Column()
    address: string;

    @Column({
        type: 'enum',
        enum: BoostOptions,
        default: null
    })
    boost: string

    @Column({
        type: 'boolean',
        default: true
    })
    isAvailable: boolean;

    @ManyToOne(() => User, (user) => user.posts)
    user: User
}
