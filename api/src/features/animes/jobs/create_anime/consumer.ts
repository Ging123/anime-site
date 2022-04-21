import { Processor, Process, OnQueueFailed } from "@nestjs/bull";
import anime from "../../interfaces/animes.interface";
import AnimeRepo from "../../repositories/anime.repo";
import { Inject } from "@nestjs/common";
import { Job } from "bull";

@Processor("create-anime-queue")
class CreateAnimeConsumer {
  
  constructor(
    @Inject(AnimeRepo)
    private readonly anime:AnimeRepo
  ) {}

  @OnQueueFailed()
  error(err:Job) {
    console.log(`create-anime-queue - ${err.failedReason}`);
  }

  @Process("create-anime-job")
  async create(job: Job<anime>) {
    const { name, description, image } = job.data;
    await this.anime.create(name, description, image);
  }
}

export default CreateAnimeConsumer;