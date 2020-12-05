const { assert } = require('console');
const input = require('fs').readFileSync('4.txt').toString();

const parse = (txt) => Object.fromEntries(txt.split(/\s/).map(e => e.split(':')));

const between = (min, max) => (v) => v >= min && v <= max;
const match = regex => (v) => v && v.match(regex);
const any = (...options) => (v) => options.includes(v);

const FIELDS = [
  { name:'byr', valid: between(1920, 2002) },
  { name:'iyr', valid: between(2010, 2020) },
  { name:'eyr', valid: between(2020, 2030) },
  { name:'hgt', valid: (v) => {
    const match = v && v.match(/^(\d+)(cm|in)$/);
    if (!match) return false;
    const [_, h, unit] = match;
    return (unit === 'cm' ? between(150, 193) : between(59, 76))(h);
  } },
  { name:'hcl', valid: match(/^#[0-9a-f]{6}$/) },
  { name:'ecl', valid: any('amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth') },
  { name:'pid', valid: match(/^\d{9}$/) },
  { name:'cid', valid: () => true }
];

const passports = input.split('\n\n').map(parse);

// Part 1
// const validate = p => FIELDS.every(f => f.name === 'cid' || !!p[f.name]);

// Part 2

const validate = p => FIELDS.every(f => f.valid(p[f.name]));

assert(!validate(parse('byr:2003')));
assert(!validate(parse('hgt:190in')));
assert(!validate(parse('hgt:190')));
assert(!validate(parse('hcl:#123abz')));
assert(!validate(parse('hcl:123abc')));
assert(!validate(parse('ecl:wat')));

assert(!validate(parse('eyr:1972 cid:100\nhcl:#18171d ecl:amb hgt:170 pid:186cm iyr:2018 byr:1926')));
assert(!validate(parse('iyr:2019\nhcl:#602927 eyr:1967 hgt:170cm\necl:grn pid:012533040 byr:1946')));
assert(!validate(parse('hcl:dab227 iyr:2012\necl:brn hgt:182cm pid:021572410 eyr:2020 byr:1992 cid:277')));
assert(!validate(parse('hgt:59cm ecl:zzz\neyr:2038 hcl:74454a iyr:2023\npid:3556412378 byr:2007')));

assert(validate(parse('pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980 hcl:#623a2f')));

assert(validate(parse('pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980\nhcl:#623a2f')));
assert(validate(parse('eyr:2029 ecl:blu cid:129 byr:1989\niyr:2014 pid:896056539 hcl:#a97842 hgt:165cm')));
assert(validate(parse('hcl:#888785\nhgt:164cm byr:2001 iyr:2015 cid:88\npid:545766238 ecl:hzl\neyr:2022')));
assert(validate(parse('iyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:093154719')));

const valid = passports.filter(validate);

console.log(`We have ${valid.length} valid passports`);