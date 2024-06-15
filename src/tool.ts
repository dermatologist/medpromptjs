import { DynamicStructuredTool } from "langchain/tools";
import mydi from "./mydi";

export class BaseTool extends DynamicStructuredTool {

    container: any;
    name: string;
    description: string;
    schema: any;
    constructor(container: any, name: string, description: string, schema: any, func: any = null) {
        super({
            name: name,
            description: description,
            schema: schema,
            func: func
        });
        this.container = container;
        this.name = name === "" ? this.camelize(this.constructor.name) : name;
        this.description = description === "" ? this.snake_case(this.constructor.name) : description;
        this.schema = schema;
    }

    func = async (args: any) => {
                return "override this";
    }

    resolve(name: string) {
        return mydi(this.container, this.name, name);
    }

    camelize(str: string) {
        return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
            return index === 0 ? word.toLowerCase() : word.toUpperCase();
        }).replace(/\s+/g, '');
    }

    snake_case(str: string) {
        return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
            return index === 0 ? word.toLowerCase() : "_" + word.toLowerCase();
        }).replace(/\s+/g, '');
    }

}