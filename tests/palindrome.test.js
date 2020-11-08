const { TestScheduler } = require('jest')

const palindrome = require('../utils/for_testing').palindrome

test('palindrome of a', () => {
    const result = palindrome('a')
    
    expect(result).toBe('a')
})

test('palindrome of lazaron', () => {
    const result = palindrome('lazaron')
    
    expect(result).toBe('norazal')
})

test('palindrome of a', () => {
    const result = palindrome('ioi')
    
    expect(result).toBe('ioi')
})

