Pokemon Randomizer
==================

This is a simple command line interface to generate random teams of pokemon


Options:

* n: number of random pokemon to generate
* e: choose only fully evolved pokemon
* t: choose only pokemon of this type
* s: choose only pokemon super effective against this type
* f: load options from this file

Examples:

* poke-rand -n 5
* poke-rand -e -t fire
* poke-rand -f /path/to/json/file/options
* poke-rand -s psychic
