import React from "react";
import { stripHtml } from "string-strip-html";


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