import { imgsDir, imgsObject } from "./const";

class _Solution {
  Section_1() {
    return {
      text: "Our solution",
    };
  }
  Section_2() {
    return [
      {
        tab_id: 1,
        tab_name: "Biogas Energy",
        tab_img: imgsDir(imgsObject.Solution.biogas),
        tab_content: `<h3>Innovative Solution Turns Manure into Renewable Energy</h3>
          <p>Manure is a common byproduct of animal agriculture, and while it can be a valuable source of nutrients for plants and crops, its disposal can also pose a significant environmental challenge. However, thanks to the solution developed by  DCarbon, manure is no longer just a waste product, but rather a potential source of renewable energy. This process involves the use of microorganisms to break down organic matter, such as manure, in the absence of oxygen. The result is biogas that can be used to generate electricity, heat or fuel.</p>
          <br />
          <br />
          <h3>A Sustainable and Low-Carbon Solution for Livestock Farming</h3>
          <p>This solution not only provides a sustainable source of energy but also helps to reduce greenhouse gas emissions, as the process of anaerobic digestion prevents the release of methane, a potent greenhouse gas that is produced when manure decomposes in the open air. By converting manure into energy, it is possible to reduce the environmental impact of livestock farming while also contributing to the transition to a low-carbon economy.</p>`,
      },
      {
        tab_id: 2,
        tab_name: "Waste to energy",
        tab_img: imgsDir(imgsObject.Solution.energy),
        tab_content: `<h3>What is waste to energy</h3>
          <p>Waste to Energy (WtE) refers to the process of generating energy, typically in the form of electricity or heat, from various types of waste materials. It is a form of sustainable waste management that aims to reduce the volume of waste sent to landfills while simultaneously harnessing the energy content of the waste.</p>
          <br />
          <h3>The WtE process involves the following general steps:</h3>
          <ol>
          <li><b>Waste Collection:</b> Different types of waste, such as municipal solid waste (MSW), industrial waste, agricultural waste, and biomass, are collected and sorted to remove recyclable materials and hazardous substances. The remaining waste is then processed for energy recovery.</li>
          <li><b>Waste Pre-treatment:</b> The collected waste is subjected to pre-treatment processes to remove non-combustible materials, such as metals and inert components, that could interfere with the combustion or gasification process.</li>
          <li><b>Combustion or Gasification:</b> The waste is either directly incinerated in a controlled combustion chamber or converted into a gaseous fuel through a gasification process. In combustion, the waste is burned at high temperatures, while in gasification, the waste is heated in a low-oxygen environment to produce a synthesis gas (syngas) containing carbon monoxide and hydrogen.</li>
          <li><b>Energy Generation:</b> The high-temperature combustion gases or syngas produced in the previous step are utilized to generate energy. In the case of combustion, the heat generated is used to produce steam, which drives a turbine connected to an electrical generator, thus generating electricity. In gasification, the syngas is typically cleaned, cooled, and then combusted in a similar manner.</li>
          <li><b>Residue Management:</b> The residues generated during the combustion or gasification process, such as ash and particulate matter, are collected and treated to minimize environmental impact. Ash can often be used for purposes such as producing bio bio-char fertilizer, construction materials or can be disposed of safely.</li>
          </ol>
          <br />
          <p>Waste to Energy facilities offer several benefits. Firstly, they provide a sustainable solution to waste management by reducing the amount of waste sent to landfills, thereby mitigating environmental and health risks associated with landfilling. Secondly, they convert waste into useful energy, thereby reducing reliance on fossil fuels and contributing to the generation of renewable energy. Additionally, WtE can help in reducing greenhouse gas emissions that would have been released during the decomposition of organic waste in landfills.</p>`,
      },
      {
        tab_id: 3,
        tab_name: "Clean Cookstoves",
        tab_img: imgsDir(imgsObject.Solution.stove),
        tab_content: `<h3>What is clean cookstove</h3>
          <p>A clean cookstove with gasification is an advanced cooking device that utilizes gasification technology to convert biomass or solid fuels into clean-burning gases. Unlike traditional cookstoves that burn solid fuels directly, gasification cookstoves offer improved combustion efficiency and reduced emissions.
          The process involves heating the biomass or solid fuel in a controlled, low-oxygen environment, known as a gasifier. This leads to the production of combustible gases, such as carbon monoxide, hydrogen, and methane. These gases are then used as a clean fuel source for cooking in the specially designed cookstove.</p>
          <br />
          <h3>The benefit of using clean cookstoves</h3>
          <p>A clean cookstove with gasification provides several benefits. Firstly, it significantly reduces indoor air pollution by minimizing the release of harmful pollutants like carbon monoxide, particulate matter, and volatile organic compounds. This improves the health and safety of users, particularly in households where cooking is done indoors. Secondly, gasification technology increases fuel efficiency, as the produced gases have a higher energy content compared to raw solid fuels. This means that less biomass or solid fuel is required for cooking, reducing fuel consumption and the demand for natural resources.</p>
          <p>Furthermore, clean cookstoves with gasification contribute to environmental sustainability by reducing greenhouse gas emissions. The controlled combustion process and cleaner fuel source help minimize the release of carbon dioxide and other greenhouse gases, compared to traditional cookstoves that burn solid fuels directly. In summary, a clean cookstove with gasification offers an environmentally friendly and efficient cooking solution. It reduces indoor air pollution, improves fuel efficiency, and contributes to mitigating climate change by minimizing emissions. Adopting such cookstoves can have significant positive impacts on health, environment, and sustainable cooking practices.</p>`,
      },
    ];
  }
}
export default _Solution;
