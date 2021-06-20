
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('questions').del()
    .then(function () {
      return knex('subjects').insert([
          { name: 'Real world'},
          { name: 'Maths'},
          { name: 'English'}
      ]).then(function(subjectId){
        return knex('question_sets').insert([
          { set_name: 'Test', subject_id:subjectId, tags:'', level: 1, status: 'Draft'}
        ]).then(function(setId){
          return knex('question_types').insert([
            {type: 'Other', template_name: 'Other'}
          ]).then(function (typeId) {
            return knex('questions').insert([
              {
               title: 'Confidence and courageous. Showing a willingness to take risks',
               level: 1,
               type_id: typeId,
               set_id: setId,
               is_active: true,
               subject_id: subjectId,
               specification: '{ "question": "Confidence and courageous. Showing a willingness to take risks", "options": ["Bowled","Bold","Bald"], "answer": "Bowled" }',
               points : 100,
               status: 'Active'
              },
              {
                title: 'The girl had a huge umbrella to shade her from the sun',
                level: 1,
                type_id: typeId,
                set_id: setId,
                is_active: true,
                subject_id: subjectId,
                specification: '{ "question": "The girl had a huge umbrella to shade her from the sun ", "options": ["Show","Colour","Shield"], "answer": "Shield" }',
                points : 100,
                status: 'Active'
             },
             {
                title: 'The circus was full of excellent performers who did a great job.',
                level: 1,
                type_id: typeId,
                set_id: setId,
                is_active: true,
                subject_id: subjectId,
                specification: '{ "question": "The circus was full of excellent performers who did a great job. ", "options": ["Audience","Actors","Fan"], "answer": "Actors" }',
                points : 100,
                status: 'Active'
             },
             {
                title: 'He was lying down with his eyes closed and looked very serene.',
                level: 1,
                type_id: typeId,
                set_id: setId,
                is_active: true,
                subject_id: subjectId,
                specification: '{ "question": "He was lying down with his eyes closed and looked very serene. ", "options": ["Worried","Disturbed","Calm"], "answer": "Calm" }',
                points : 100,
                status: 'Active'
             },
             {
                title: 'Money paid for a journey on public transport.',
                level: 1,
                type_id: typeId,
                set_id: setId,
                is_active: true,
                subject_id: subjectId,
                specification: '{ "question": "Money paid for a journey on public transport. ", "options": ["Fare","Fear","Fair"], "answer": "Fare" }',
                points : 100,
                status: 'Active'
             },
             {
                title: 'Powder obtained by grinding grain, typically wheat.',
                level: 1,
                type_id: typeId,
                set_id: setId,
                is_active: true,
                subject_id: subjectId,
                specification: '{ "question": "Powder obtained by grinding grain, typically wheat. ", "options": ["Floor","Flower","Flour"], "answer": "Flour" }',
                points : 100,
                status: 'Active'
             }            
             ]);
          })
        })
      })
    });
};
