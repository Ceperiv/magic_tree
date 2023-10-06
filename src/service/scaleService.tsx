let scaleValue = 100

export const scaleService = {

    setScale: (scale: number): void => {
        scaleValue = scale
    },
    getScale: (): number => {
        return scaleValue
    }

}
