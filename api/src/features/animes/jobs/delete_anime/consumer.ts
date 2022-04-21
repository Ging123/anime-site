import { Processor, Process, OnQueueFailed } from "@nestjs/bull";
import AnimeRepo from "../../repositories/anime.repo";
import { Inject } from "@nestjs/common";
import { Job } from "bull";

interface anime {
  name:string;
}

@Processor("delete-anime-queue")
class DeleteAnimeConsumer {
  
  constructor(
    @Inject(AnimeRepo)
    private readonly anime:AnimeRepo
  ) {}

  @OnQueueFailed()
  error(err:Job) {
    console.log(`delete-anime-queue - ${err.failedReason}`);
  }

  @Process("delete-anime-job")
  async delete(job: Job<anime>) {
    const { name } = job.data;
    await this.anime.deleteByName(name);
  }
}

export default DeleteAnimeConsumer;