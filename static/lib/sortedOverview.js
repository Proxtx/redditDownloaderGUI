export class SortedOverview {
  wrapper;
  generator;
  sortController;

  loadingProgress = 0;
  loadingSteps = 3;
  loadingFinished = false;

  postLoader = 0;

  constructor(wrapper, generator, sortController) {
    this.wrapper = wrapper;
    this.generator = generator;
    this.sortController = sortController;
    this.wrapper.addEventListener("scroll", () => this.loadNewPosts());
    this.sortController.change = () => {
      this.reset();
    };
  }

  reset = () => {
    this.loadingFinished = false;
    this.wrapper.innerHTML = "";
    this.loadingProgress = 0;
    this.loadNewPosts();
  };

  loadNewPosts = async () => {
    for (
      let i = 0;
      i < 3 && this.needsMorePosts() && !this.loadingFinished;
      i++
    )
      this.loadPost(this.loadNewPosts);
  };

  loadPost = async (job) => {
    if (this.postLoader > this.loadingSteps) return;
    this.postLoader++;
    this.loadingFinished = await this.generator(
      this.loadingProgress,
      ++this.loadingProgress,
      this.sortController
    );
    this.postLoader--;
    job();
  };

  needsMorePosts = () => {
    return (
      this.wrapper.scrollHeight -
        this.wrapper.scrollTop -
        this.wrapper.clientHeight * 2 <=
      this.wrapper.clientHeight
    );
  };
}
