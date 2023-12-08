
export default class Product {
    #id;
    #name;
    #quantity;
    #price;

    constructor(id, name, quantity, price) {
        this.#id = id;
        this.#name = name;
        this.#quantity = quantity;
        this.#price = price;
    }

    get id() {
        return this.#id;
    }

    set id(id) {
        this.#id = id;
    }

    get name() {
        return this.#name;
    }

    set name(name) {
        this.#name = name;
    }

    get quantity() {
        return this.#quantity;
    }

    set quantity(quantity) {
        this.#quantity = quantity;
    }

    get price() {
        return this.#price;
    }

    set price(price) {
        this.#price = price;
    }
}