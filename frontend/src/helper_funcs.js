
const stripHtml = require('string-strip-html');

// this pacakge + function seems to work well enough for right now, but I wish the summary section looked better. I was fearful of using 'dangerouslySetInnerHTML', because i'm not sure I fully trust all the info from the API
export const cleanHTML = (dirtyHTML) => {
   let cleaned =  stripHtml(dirtyHTML, {
        skipHtmlDecoding: true,
        cb: ({ tag, deleteFrom, deleteTo, insert, rangesArr, proposedReturn }) => {
          let temp;
          if (
            tag.name === "a" &&
            tag.attributes &&
            tag.attributes.some((attr) => {
              if (attr.name === "href") {
                temp = attr.value;
                return true;
              }
            })
          ) {
            rangesArr.push([deleteFrom, deleteTo, `${temp} ${insert || ""}`]);
          } else {
            rangesArr.push(proposedReturn);
          }
        },
      }).result;

      return cleaned;
}

export const cuiseneTypes = [
  'African',
  'Asian',
  'American',
  'British',
  'Cajun',
  'Caribbean',
  'Chinese',
  'Eastern European',
  'European',
  'French',
  'German',
  'Greek',
  'Indian',
  'Irish',
  'Italian',
  'Japanese',
  'Jewish',
  'Korean',
  'Latin American',
  'Mediterranean',
  'Mexican',
  'Middle Eastern',
  'Nordic',
  'Southern',
  'Spanish',
  'Thai',
  'Vietnamese'
];


// export default { cleanHTML }