export function add(x: number, y: number){
    return x + y;
}

describe('Initial Teste', ()=>{
    test('add function ', ()=>{
        expect(add(1,2)).toEqual(3)
    })
})