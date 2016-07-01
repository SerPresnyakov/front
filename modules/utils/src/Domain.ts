export const DomainFilter: ak.config<() => (input: string) => string> = {
    name: "domain",
    config: () => {
        return (input):string => {
            var output = '';
            var urls = /\w+:\/\/([^\/\?]+)/;
            var matches = urls.exec(input);
            if(matches != null) {
                output = matches[1];
            }
            return output;
        }
    }
};
