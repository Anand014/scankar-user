const EXAM_STATES = Object.freeze({
  inProgress: 1,
  completed: 2
});

const QUESTION_STATES = Object.freeze({
  notVisited: 0,
  visited: 1,
  answered: 2,
  notAnswered: 3,
  markedForReview: 4
});

export default {
  EXAM_STATES,
  QUESTION_STATES
};