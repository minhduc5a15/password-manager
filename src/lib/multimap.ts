export class Multimap<K, V> {
    public map: Map<K, V[]>;

    constructor() {
        this.map = new Map<K, V[]>();
    }

    set(key: K, value: V) {
        if (!this.map.has(key)) {
            this.map.set(key, []);
        }
        this.map.get(key)!.push(value);
    }

    get(key: K): V[] | undefined {
        return this.map.get(key);
    }

    delete(key: K, value: V): boolean {
        const values = this.map.get(key);

        if (!values) return false;
        const index = values.indexOf(value);
        if (index === -1) return false;
        values.splice(index, 1);
        if (values.length === 0) {
            this.map.delete(key);
        }
        return true;
    }

    deleteAll(key: K): boolean {
        return this.map.delete(key);
    }

    has(key: K): boolean {
        return this.map.has(key);
    }

    keys(): K[] {
        return Array.from(this.map.keys());
    }

    values(): V[] {
        return Array.from(this.map.values()).flat();
    }

    entries(): [K, V[]][] {
        return Array.from(this.map.entries());
    }

    size(): number {
        return this.map.size;
    }
}
