import { from } from "./queries";
import { PrimaryKey, Table } from "./Table";

interface IArtist {
  id: number;
  name: string;
}

const artists = new Table<IArtist>(
  "artists",
  {
    id: { dataType: "INTEGER" },
    name: { dataType: "TEXT" },
  },
  [new PrimaryKey("id")]
);

describe("given using Table.ts helper to build some selects queries", () => {
  const sqlExpected = 
  `SELECT artist.id AS id, artist.name AS name
  FROM artists AS artist`
  describe("when converting a Table object to DB", () => {
    it(`then result must be ${sqlExpected}`, () => {
      const query = from(artists, "artist").select((r) => r.artist);
      expect(query.toSQL()).toStrictEqual(sqlExpected)
    });
  });
});
