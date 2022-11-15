import { CitiesEnum } from "src/enums/cities.enum";
import { IndusTypeEnum } from "src/enums/indus.type.enum";
import { RolesEnum } from "src/enums/roles.enum";
import { Post } from "src/posts/entities/post.entity";
import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, OneToMany } from "typeorm";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({
        unique: true
    })
    email: string;

    @Column()
    number: number;

    @Column({
        type:"enum",
        enum:RolesEnum
    })
    role: string;

    @Column({
        type:"enum",
        enum:CitiesEnum
    })
    city: string;

    @Column()
    address: string;

    @Column({
        default: null
    })
    company_name: string;

    @Column({
        type: "enum",
        enum: IndusTypeEnum,
        default: null
    })
    indus_type: string;

    @Column()
    password: string;

    @Column()
    salt: string;
    
    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @OneToMany(() => Post, (post) => post.user)
    posts: Post[]
}


