import { useEffect, useState } from "react";
function logWaste(){
    const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
    const [quantity, setQuantity] = useState<number | "">(0);
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState<{ date?: string; quantity?: string}>({});

    const valid = (): { date?: string; quantity?: string} => {
        const newErrors: { date?: string; quantity?: string} = {};
        if (date === "") newErrors.date = "Please enter a date.";
            else if (new Date(date) > new Date()) newErrors.date = "Date cannot be in the future.";

        if (quantity === "" || typeof quantity === "string") newErrors.quantity = "Please enter a valid quantity.";
        else if (quantity <= 0) newErrors.quantity = "Quantity must be a positive number.";
        return newErrors;
    };

    useEffect(() => {
        if (!submitted) return;
        setErrors(valid());
    }, [date, quantity]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        const validationErrors = valid();
        if (Object.keys(validationErrors).length > 0) 
            {
                setErrors(validationErrors);
            }
        else{
        /* Enter data into database here */
            setDate("");
            setQuantity("");
            setErrors({});
            setSubmitted(false);
        };
    }

    const handleBlur = (e: React.FocusEvent<HTMLFormElement>) => {
    if ((e.relatedTarget as HTMLElement)?.id === "log-poop-button") return;
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
            setDate(new Date().toISOString().split("T")[0]);
            setQuantity(0);
            setErrors({});
            setSubmitted(false);
        }
    }

    return(
        <form id = "poop-form" onSubmit={handleSubmit} onBlur={handleBlur} noValidate>
            <hr id="waste-hr"/>
                    <label htmlFor="collect-date">Date Collected:</label>
                    <input type="date" name="collect-date" id="collect-date" value={date} onChange={(e) => setDate(e.target.value)}
                    className={errors.date ? "errorBorder" : ""} required/>
                    {errors.date && <span className="formError">{errors.date}</span>}

                    <label htmlFor="quantity">Quantity Collected (kg):</label>
                    <input type="number" name="quantity" id="quantity" value={quantity} onChange={(e) => setQuantity(parseFloat(e.target.value) || 0)}
                    className={errors.quantity ? "errorBorder" : ""} required/>
                    {errors.quantity && <span className="formError">{errors.quantity}</span>}

                    <label htmlFor="notes">Notes:</label>
                    <textarea name="notes" id="notes" rows={4} placeholder="Additional details about the collection..."></textarea>
                    <button type="submit" id = "log-poop-button">Log Collection</button>

        </form>
    )
}
export default logWaste;