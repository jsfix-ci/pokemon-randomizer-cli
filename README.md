Pokemon Randomizer CLI
==================

This is a simple command line interface to generate random lists of pokemon


Options:

```
n [number]: number of random pokemon to generate
e [evolved]: choose only fully evolved pokemon
t [type]: choose only pokemon of this type
s [superEffective]: choose only pokemon super effective against this type
f [file]: load options from this file
```

Examples:

```
# Defaults to 6 random pokemon
$ poke-rand
Picked 6 Pokemon
Tauros
Dewgong
Magmar
Venonat
Omastar
Arcanine

# You can pick the number of pokemon to return
$ poke-rand --number 2
Picked 2 Pokemon
Pikachu
Abra

# You can use the short form of an option
$ poke-rand -n 2
Picked 2 Pokemon
Abra
Abra

# You can pick only unique pokemon (no duplicates)
$ poke-rand -n 2 -u
Picked 2 Pokemon
Gloom
Abra

# You can pick the type of pokemon
$ poke-rand -n 2 -t fire
Picked 2 Pokemon
Ponyta
Ninetales

# You can pick only evolved pokemon
$ poke-rand -n 2 -t fire -e
Picked 2 Pokemon
Rapidash
Ninetales

# You can pick pokemon that are super effective against a type
$ poke-rand -n 2 -s water 
Picked 2 Pokemon
Weepinbell
Electrode
```

You can also specify the options in a json file, like so:

```
{
    "number": 2,
    "type": "normal",
    "evolved": true,
    "unique": true,
    "superEffective": "grass"
}
```

And load these options like so:
```
$ poke-rand -f /path/to/json/file/options.json
Chose 2 Pokemon
Pidgeot
Dodrio
```

If you specify options that no pokemon can satisfy, you'll get an error.
```
# Pick 2 unique fully evolved ghost types (invalid!)
$ poke-rand -n 2 -u -e -t ghost
Error: Not enough pokemon satisfy those options

# Try removing the unique option, or specify a lower number of pokemon to return
# Pick 2 fully evolved ghost types
$ poke-rand -n 2 -e -t ghost
Chose 2 Pokemon
Gengar
Gengar
```
