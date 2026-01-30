import { loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "/js/ExternalServices.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const services = new ExternalServices();
const checkout = new CheckoutProcess(services);
checkout.init();
