import {Simulate} from "react-dom/test-utils";
import click = Simulate.click;

export const updateService: any = {
    onClick: () => {
            const btn = document.getElementById('button_0')
            if (btn) {
                btn.click()
                console.log('clicked')
            }
    },
};
