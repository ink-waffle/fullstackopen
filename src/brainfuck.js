/** Runs a Brainfuck program on an 8-bit tape and returns its output. */
export const run = (program, input = '') => {
  const code = [...program].filter((c) => '+-<>[].,'.includes(c))
  const jumps = new Map()
  const open = []
  code.forEach((c, i) => {
    if (c === '[') open.push(i)
    if (c === ']') {
      const j = open.pop()
      jumps.set(i, j).set(j, i)
    }
  })

  const tape = new Uint8Array(30000)
  let ptr = 0
  let read = 0
  let output = ''
  for (let pc = 0; pc < code.length; pc++) {
    switch (code[pc]) {
      case '+': tape[ptr]++; break
      case '-': tape[ptr]--; break
      case '>': ptr++; break
      case '<': ptr--; break
      case '.': output += String.fromCharCode(tape[ptr]); break
      case ',': tape[ptr] = input.charCodeAt(read++) || 0; break
      case '[': if (!tape[ptr]) pc = jumps.get(pc); break
      case ']': if (tape[ptr]) pc = jumps.get(pc); break
    }
  }
  return output
}
