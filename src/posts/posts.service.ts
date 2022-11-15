import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {

  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>
  ) {}

  create(createPostDto: CreatePostDto) {
    return 'This action adds a new post';
  }

  async findAll(): Promise<Post[]> {
    return await this.postRepository.findBy({isAvailable: true});
  }

  // async findOwn(user: User) {
  //   return user.posts;
  // }

  async findOne(id: number): Promise<Post> {
    return await this.postRepository.findOneBy({id: id});
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const newPost = await this.postRepository.preload({
      id,
      ...updatePostDto
    });
    return await this.postRepository.save(newPost);
  }

  async remove(id: number) {
    const postToRemove = await this.findOne(id);
    if(!postToRemove) {
      throw new NotFoundException('post does not exist!')
    }
    return await this.postRepository.remove(postToRemove);
  }
}
