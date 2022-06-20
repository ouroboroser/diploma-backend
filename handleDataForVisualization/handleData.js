const fs = require('fs');

module.exports = Rx => {
    const origOf = Rx.Rx.of;
    const origRange = Rx.Rx.range;
    const origFromFetch = Rx.RxFetch.fromFetch;
    const operations = [];

    Object.defineProperty(Rx.Rx, 'of', { get: () => (...args) => {
        operations.push({
            operation: 'of_created',
            args: args,
        });
        return origOf(...args);
    }});

    Object.defineProperty(Rx.Rx, 'range', { get: () => (...args) => {
        operations.push({
            operation: 'range_created',
            args: args,
        });
        return origRange(...args);
    }});

    Object.defineProperty(Rx.RxFetch, 'fromFetch', { get: () => (...args) => {
        const fetch = origFromFetch(...args);

        operations.push({
            operation: 'from_fetch_url',
            args: args[0].toString(),
        });

        return origFromFetch(...args);
    }});

    const origFilter = Rx.Rx.filter;
    Object.defineProperty(Rx.Rx, 'filter', { get: () => (...args) => {
        // console.log('creating filter with', args[0].toString());
        const filter = origFilter(...args);

        return input => {
            const loggerBefore = input.pipe(origMap(t => {
                operations.push({
                    operation: 'filter_input',
                    filter: args[0].toString(),
                    arg: t,
                });
                return t;
            }));

            const filterApplied = filter(loggerBefore);

            const loggerAfter = filterApplied.pipe(origMap(t => {
                operations.push({
                    operation: 'filter_output',
                    filter: args[0].toString(),
                    arg: t,
                });
                return t;
            }));

            return loggerAfter;
        }
    }});

    const origMap = Rx.Rx.map;
    Object.defineProperty(Rx.Rx, 'map', { get: () => (...args) => {
        // console.log('creating map with', args[0].toString());
        const map = origMap(...args);

        return input => {
            const loggerBefore = input.pipe(origMap(t => {
                operations.push({
                    operation: 'map_input',
                    map: args[0].toString(),
                    arg: t,
                });
                return t;
            }));

            const mapApplied = map(loggerBefore);

            const loggerAfter = mapApplied.pipe(origMap(t => {
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

    Rx.Rx.explore = (apiKey) => {
        fs.writeFileSync('../backend/handleDataForVisualization/result/diagram.json', JSON.stringify(operations, null, 2), console.error);
    };
};