const knex = require("knex");

const config = require("../knexfile");

const db = knex(config.development);

module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove,
  addStep
};
//find
function find() {
  return db("schemes");
}
//find by id
function findById(id) {
  return db("schemes")
    .where({ id })
    .first();
}
//select for given scheme
function findSteps(id) {
  return db
    .select(
      "steps.id",
      "steps.step_number",
      "steps.instructions",
      "schemes.scheme_name"
    )
    .from("steps")
    .join("schemes", "steps.scheme_id", "schemes.id")
    .where("steps.scheme_id", id)
    .orderBy("steps.step_number");
}
//adds a scheme
function add(scheme) {
  const { scheme_name } = scheme;
  return db("schemes")
    .insert({ scheme_name })
    .then(([id]) => findById(id));
}
//update by id
function update(changes, id) {
  const { scheme_name } = changes;
  return db("schemes")
    .where({ id })
    .update({ scheme_name })
    .then(() => findById(id));
}
//remove by id
async function remove(id) {
  const scheme = await findById(id);
  return db("schemes")
    .where({ id })
    .del()
    .then(() => scheme);
}
//add a step
function addStep(step, scheme_id) {
  const { step_number, instructions } = step;
  return db("steps")
    .insert({ step_number, instructions, scheme_id })
    .then(([id]) => findStepById(id));
}
//finds step by id
function findStepById(id) {
  return db("steps")
    .where({ id })
    .first();
}
