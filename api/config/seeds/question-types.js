
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('question_types').del()
    .then(function () {
      // Inserts seed entries
      return knex('question_types').insert([
        {is_active:true, template_name:"Calculator Question", type:"Calculator Question"},
        {is_active:true, template_name:"MCQ (Multiple Choice Questions)", type:"MCQ (Multiple Choice Questions)"},
        {is_active:true, template_name:"Match the following One to one", type:"Match the following One to one"},
        {is_active:true, template_name:"Match the following One to Many", type:"Match the following One to Many"},
        {is_active:true, template_name:"Multi select question", type:"Multi select question"},
        {is_active:true, template_name:"Table questions", type:"Table questions"},
        {is_active:true, template_name:"Fill in the blanks", type:"Fill in the blanks"},
        {is_active:true, template_name:"Box type questions", type:"Box type questions"}
      ]);
    });
};
