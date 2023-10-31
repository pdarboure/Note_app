const app = require("express")

const router = app.Router()

const { renderNoteForm, createNewNote, renderNotes, renderEditForm, updateNote, deleteNote } = require("../controllers/notes.controller")
//CLASE 10, SE CREAN LAS RUTAS Y SOLO SE LES PONE UN MSJ PARA ENVIAR (RES.SEND)

const { isAuthenticated } = require("../helpers/auth")

//new note
router.get("/notes/add", isAuthenticated, renderNoteForm);

router.post("/notes/new-note", isAuthenticated, createNewNote)

//get all notes

router.get("/notes", isAuthenticated, renderNotes)

//edit notes

router.get("/notes/edit/:id", isAuthenticated, renderEditForm)

router.put("/notes/edit/:id", isAuthenticated, updateNote)

//delete

router.delete("/notes/delete/:id", isAuthenticated, deleteNote)

module.exports = router