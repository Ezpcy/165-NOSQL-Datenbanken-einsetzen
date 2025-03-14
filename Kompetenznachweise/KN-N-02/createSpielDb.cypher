CREATE
  (dev1:Entwickler {firstname: 'Robert', lastname: 'Müller', role: 'Game Designer', experience: 5}),
  (dev2:Entwickler {firstname: 'Sarah', lastname: 'Schmidt', role: 'Artist', experience: 3}),
  (dev3:Entwickler {firstname: 'David', lastname: 'Burger', role: 'Programmierer', experience: 3}),
  (dev4:Entwickler {firstname: 'Thomas', lastname: 'Fischer', role: 'Programmierer', experience: 6}),

  (game1:Spiel {title: 'Crysis 4', releaseDate: date('2026-02-04'), genres: ['Action', 'Shooter']}),
  (game2:Spiel {title: 'Assassins Creed: Remastered', releaseDate: date('2025-04-08'), genres: ['RPG', 'Action']}),
  (game3:Spiel {title: 'Rayman 3', releaseDate: date('2027-04-08'), genres: ['Action', 'Jump n Run']}),

  (pub1:Publisher {title: 'CryTek', website: 'www.crytek.com', tel: '12345678', email: 'contact@crytek.com'}),
  (pub2:Publisher {title: 'Ubisoft', website: 'www.ubisoft.com', tel: '87654321', email: 'contact@ubisoft.com'}),
  (pub3:Publisher {title: 'Namco', website: 'www.namco.com', tel: '87654321', email: 'contact@namco.com'}),
  
  (platform1:Plattform {titel: 'Xbox', hersteller: 'Microsoft'}),
  (platform2:Plattform {titel: 'Playstation', hersteller: 'Sony'}),
  (platform3:Plattform {titel: 'Nintendo Switch', hersteller: 'Nintendo'}),

  (tech1:Technologie {title: 'CryEngine', version: 5.4, sprache: 'C++'}),
  (tech2:Technologie {title: 'Unreal Engine', version: 5.2, sprache: 'C++'}),
  (tech3:Technologie {title: 'Unity', version: 4.2, sprache: 'C#'}),

  (dev1)-[:DEVELOPS]->(game1),
  (dev3)-[:DEVELOPS]->(game1),
  (dev1)-[:IS_LEAD_DEV]->(game1),
  
  (dev2)-[:DEVELOPS]->(game2),
  (dev4)-[:DEVELOPS]->(game2),
  (dev4)-[:IS_LEAD_DEV]->(game2),

  (dev2)-[:DEVELOPS]->(game3),
  (dev2)-[:IS_LEAD_DEV]->(game3),
  (dev3)-[:DEVELOPS]->(game3),

  (game1)-[:HAS_PUBLISHER]->(pub1),
  (game2)-[:HAS_PUBLISHER]->(pub2),
  (game3)-[:HAS_PUBLISHER]->(pub2),

  (platform1)-[:HAS_SPIEL]->(game1),
  (platform1)-[:HAS_SPIEL]->(game2),

  (platform2)-[:HAS_SPIEL]->(game1),
  (platform2)-[:HAS_SPIEL]->(game2),

  (platform3)-[:HAS_SPIEL]->(game3),

  (game1)-[:HAS_TECHNOLOGIE]->(tech1),
  (game2)-[:HAS_TECHNOLOGIE]->(tech2),
  (game3)-[:HAS_TECHNOLOGIE]->(tech3);

RETURN 'Success';
