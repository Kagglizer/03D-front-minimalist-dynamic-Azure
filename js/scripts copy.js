// import Story from "../data/ApproachesSteps.json";
import Story from "../data/StoryLines.json";

// This code assumes you have defined the DemoStory and DemoQuestion components elsewhere

    const StoryProblems = () => {
        const [allStories, setAllStories] = useState([]);
        const [storyStep, setStoryStep] = useState(0);
        const [answer, setAnswer] = useState(null);
      
        useEffect(() => {
          const fetchAll = async () => {
            try {
              const result = await services.fullStory();
              allStoryLinesSuccess(result);
            } catch (error) {
              console.error("Error fetching story lines:", error);
            }
          };
      
          fetchAll();
        }, []);
      
        const handleAnswer = (answer) => {
          setAnswer(answer);
        };
      
        const allStoryLinesSuccess = (result) => {
          let newResult = result.filter((story) => {
            return story.storyId === 1;
          });
          setAllStories(newResult);
        };
      
        const nextStep = () => {
          const currentStory = allStories[storyStep];
      
          if (
            currentStory &&
            currentStory.correctAnswerOption === parseInt(answer)
          ) {
            if (storyStep < allStories.length - 1) {
              setStoryStep((prev) => prev + 1);
            } else {
              setStoryStep(1);
            }
          } else {
            // Handle the case where the answer is incorrect
          }
        };
      
        useEffect(() => {
          nextStep();
        }, [answer, storyStep, allStories]);
      
        console.log(allStories, storyStep);
        (
          <div className="grid grid-cols-4 mt-1 max-w-[80rem] mx-auto h-[75vh] w-full m-20 p-12 gap-x-1">
            {/* Story Line */}
            <div className="col-span-2 border-2 border-gray-400 p-4">
              {allStories[storyStep] && (
                <DemoStory story={allStories[storyStep]} />
              )}
            </div>
            {/* Questionaire */}
            <div className="col-span-2 border-2 border-gray-400 p-4">
              {allStories[storyStep] && (
                <DemoQuestion
                  answer={answer}
                  story={allStories[storyStep]}
                  handleAnswer={handleAnswer}
                />
              )}
            </div>
          </div>
        );
      
      };