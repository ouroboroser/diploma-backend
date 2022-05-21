const fs = require('fs');

module.exports = Rx => {
    console.log('PING 1', Rx.Rx.of);
    const origOf = Rx.Rx.of;
    const origRange = Rx.Rx.range;
    const origFromFetch = Rx.RxFetch.fromFetch;
    const operations = [];

    Object.defineProperty(Rx.Rx, 'of', { get: () => (...args) => {
        //console.log('creating range with args', args);
        operations.push({
            operations: 'of_created',
            args: args,
        });
        return origOf(...args);
    }});

    Object.defineProperty(Rx.Rx, 'range', { get: () => (...args) => {
        console.log('creating range with args', args);
        operations.push({
            operations: 'range_created',
            args: args,
        });
        return origRange(...args);
    }});

    Object.defineProperty(Rx.RxFetch, 'fromFetch', { get: () => (...args) => {
        console.log('BLYA', ...args);
        operations.push({
            operations: 'from_fetch_url',
            args: args[0].toString(),
        });
        return origFromFetch(...args);
    }});

    const origFilter = Rx.Rx.filter;
    Object.defineProperty(Rx.Rx, 'filter', { get: () => (...args) => {
        console.log('creating filter with', args[0].toString());
        const filter = origFilter(...args);

        return input => {
            const loggerBefore = input.pipe(origMap(t => {
                operations.push({
                    operation: 'filter_input',
                    filter: args[0].toString(),
                    arg: t,
                });
                //console.log('filter input is ', t);
                return t;
            }));

            const filterApplied = filter(loggerBefore);

            const loggerAfter = filterApplied.pipe(origMap(t => {
                operations.push({
                    operation: 'filter_output',
                    filter: args[0].toString(),
                    arg: t,
                });
                //console.log('filter output is', t);
                return t;
            }));

            return loggerAfter;
        }
    }});

    const origMap = Rx.Rx.map;
    Object.defineProperty(Rx.Rx, 'map', { get: () => (...args) => {
        console.log('creating map with', args[0].toString());
        const map = origMap(...args);

        return input => {
            const loggerBefore = input.pipe(origMap(t => {
                //console.log('map input is', t);
                operations.push({
                    operation: 'map_input',
                    map: args[0].toString(),
                    arg: t,
                });
                return t;
            }));

            const mapApplied = map(loggerBefore);

            const loggerAfter = mapApplied.pipe(origMap(t => {
                //console.log('map output is', t);
                operations.push({
                    operation: 'map_output',
                    map: args[0].toString(),
                    arg: t,
                });
                return t;
            }));

            return loggerAfter;
        };
    }});

    Rx.Rx.saveDiagram = () => {
        fs.writeFileSync('diagram.json', JSON.stringify(operations, null, 2), console.error);
    };
};