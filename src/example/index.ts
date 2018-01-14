import { BLOG, PERSON, POST } from "./tables";
import { from } from "../queries/select";
import { SQLiteProvider } from "../providers/SQLiteProvider";
import { open } from "sqlite"
import { wrappedColumn } from "../index";

(async () =>
{
	// let db = await open("testDatabase/db.db");
	let db = await open(":memory:");
	let databaseProvider = new SQLiteProvider(db);
	
	// enable foreign keys
	await db.get("PRAGMA foreign_keys = ON");

	await PERSON.create().execute(databaseProvider);

	await PERSON.insert({ id: 1, firstname: "Max", lastname: "Mustermann" }).execute(databaseProvider);
	await PERSON.insert({ id: 2, firstname: "Erika", lastname: "Mustermann" }).execute(databaseProvider);
	// console.log(await from(PERSON, "person").select(["id", "firstname", "lastname"]).execute(databaseProvider));

	await PERSON.update({ lastname: "Musterfrau" }).where("firstname", "Erika").execute(databaseProvider);
	console.log(await from(PERSON, "person").select(["id", "firstname", "lastname"]).execute(databaseProvider));

	await PERSON.delete().where("id", 2).execute(databaseProvider);
	console.log(await from(PERSON, "person").select(["id", "firstname", "lastname"]).execute(databaseProvider));

	console.log(await from(PERSON, "person", PERSON, "person2").where(t => t.person.id, t=> t.person2.id).select([], []).execute(databaseProvider));
	
	await PERSON.drop().execute(databaseProvider);

	db.close();
})//();



console.log(
	from(PERSON, "person")
		.where(t => wrappedColumn`UPPER(${t.person.firstname})`, "DANIEL")
		.select(["id", "firstname", "lastname"])
		.toSQL()
);