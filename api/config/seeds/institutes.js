exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('institutes').del()
      .then(function () {
        // Inserts seed entries
        return knex('institutes').insert([
          {name: "Besant Hill School (formerly Happy Valley School)", address:"Ojai"},
          {name: "Buena High School", address:"Ventura"},
          {name: "Cornerstone Christian School", address:"Camarillo"},
          {name: "El Camino High School", address:"Ventura"},
          {name: "Fillmore High School", address:"Fillmore"},
          {name: "Foothill Technology High School", address:"Ventura"},
          {name: "La Reina High School", address:"Thousand Oaks"},
          {name: "Mary B. Perry High School", address:"Camarillo"},
          {name: "Moorpark High School", address:"Moorpark"},
          {name: "Newbury Park Adventist Academy", address:"Newbury Park"},
          {name: "Newbury Park High School", address:"Newbury Park"},
          {name: "Nordhoff High School", address:"Ojai"},
          {name: "Oak Park High School", address:"Oak Park"},
          {name: "Adolfo Camarillo High School", address:"Camarillo"},
          {name: "Channel Islands High School", address:"Oxnard"},
          {name: "Hueneme High School", address:"Oxnard"},
          {name: "Oxnard High School", address:"Oxnard"},
          {name: "Pacifica High School", address:"Oxnard"},
          {name: "Rio Mesa High School", address:"Oxnard"},
          {name: "Royal High School", address:"Simi Valley"},
          {name: "St. Bonaventure High School", address:"Ventura"},
          {name: "Santa Clara High School", address:"Oxnard"},
          {name: "Santa Paula High School", address:"Santa Paula"},
          {name: "Santa Susana High School", address:"Simi Valley"},
          {name: "Simi Valley High School", address:"Simi Valley"},
          {name: "The Thacher School", address:"Ojai"},
          {name: "Thousand Oaks High School", address:"Thousand Oaks"},
          {name: "Ventura County Christian School", address:"Ventura [6]"},
          {name: "Ventura High School", address:"Ventura"},
          {name: "Villanova Preparatory School", address:"Ojai"},
          {name: "Vista Real Charter High School", address:"Oxnard"},
          {name: "Vista Real Charter High School", address:"Santa Paula"},
          {name: "Vista Real Charter High School", address:"Simi Valley"},
          {name: "Vista Real Charter High School", address:"Ventura"},
          {name: "Weil Tennis Academy & College Prep School", address:"Ojai"},
          {name: "Westlake High School", address:"Westlake Village"}
        ]);
      });
  };