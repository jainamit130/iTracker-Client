
import { Interviewer } from './InterviewerDetails';

export const INTERVIEWER: Interviewer = 
  {
    id: 1,
    name: "Test Name",
    email: "testemail@gmail.com",
    role: "Fullstack Developer",
    skillset: [
        {
            skill:"java",
            round:"R2"
        },
        {
            skill:"MySQL",
            round:"R2"
        },
        {
            skill:"Spring",
            round:"R2"
        }
    ],
    currentMonth: 15,
    lastQuarter: 50,
    yearToDate: 145        
  }


// export const INTERVIEWER: Interviewer[] = [
//   {
//     id: 1,
//     name: "Test Name",
//     email: "testemail@gmail.com",
//     role: "Fullstack Developer",
//     skillset: [
//         {
//             skill:"java",
//             panel:"R2"
//         },
//         {
//             skill:"MySQL",
//             panel:"R2"
//         },
//         {
//             skill:"Spring",
//             panel:"R2"
//         }
//     ]        
//   }  
// ];
