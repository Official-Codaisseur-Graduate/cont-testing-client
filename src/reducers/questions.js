export default function questions (state= [], action) {
  switch (action.type) {
    case 'QUESTIONS_FETCHED':
      return action.questions  
    default:
      return state  
  }
}