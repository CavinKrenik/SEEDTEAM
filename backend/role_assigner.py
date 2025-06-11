# backend/role_assigner.py

def assign_roles_and_description(hd_type, authority, profile, definition, strategy, not_self_theme, incarnation_cross):
    roles = []
    description_lines = []

    # 1. Type Logic
    type_roles = {
        "Manifestor": "Initiator/Visionary",
        "Generator": "Builder/Implementer",
        "Manifesting Generator": "Multi-Passionate Executor/Innovator",
        "Projector": "Advisor/Strategist/Leader",
        "Reflector": "Evaluator/Reviewer/Sounding Board"
    }
    type_descriptions = {
        "Manifestor": "Manifestors initiate and spark new directions. They thrive when given the freedom to act and inform others of their decisions.",
        "Generator": "Generators sustain energy and love to build. They are most fulfilled when responding to work they are passionate about.",
        "Manifesting Generator": "MGs are dynamic multitaskers, blending the creativity of Manifestors with the sustaining energy of Generators.",
        "Projector": "Projectors guide and lead by managing the energies of others. They're best invited into leadership and planning roles.",
        "Reflector": "Reflectors are rare and sensitive to environments. They offer valuable insights as mirrors of the collective health."
    }
    if hd_type in type_roles:
        roles.append(type_roles[hd_type])
        description_lines.append(type_descriptions[hd_type])

    # 2. Authority Logic
    authority_descriptions = {
        "Emotional": "Needs time to reach clarity. Best in roles where decision deadlines allow emotional waves to settle.",
        "Sacral": "Trusts their gut response. Excels in fast-paced environments needing quick yes/no decisions.",
        "Splenic": "Intuitive and spontaneous. Well-suited for instinct-driven or safety-oriented roles.",
        "Ego": "Motivated by willpower and personal drive. Effective where commitment and self-interest align with goals.",
        "Self-Projected": "Finds truth by talking things out. Performs best in roles involving self-expression and authenticity.",
        "Mental Projector": "Requires sounding boards to process. Excels when allowed to analyze and reflect with trusted peers.",
        "Lunar": "Reflective and slow-paced. Best in cyclical, long-term roles with consistent environments."
    }
    if authority in authority_descriptions:
        description_lines.append(f"Authority Insight: {authority_descriptions[authority]}")

    # 3. Profile Logic
    profile_roles = {
        "1/3": "Researcher & Experimentalist",
        "1/4": "Foundation Builder & Networker",
        "2/4": "Natural Talent & Connector",
        "2/5": "Gifted Hermit & Problem Solver",
        "3/5": "Resilient Innovator & Solution-Bringer",
        "3/6": "Experimental Teacher (evolves with age)",
        "4/6": "Relationship Builder & Vision Holder",
        "4/1": "Community Leader & Independent Thinker",
        "5/1": "Practical Solver & Authority",
        "5/2": "Wise Outsider & Savior Archetype",
        "6/2": "Elder Sage & Natural Genius",
        "6/3": "Mature Role Model through Experience"
    }
    profile_descriptions = {
        "1/3": "They explore and test foundations. Great for research, prototyping, and learning through mistakes.",
        "1/4": "Combines knowledge with people. Great for building systems and sharing insights via relationships.",
        "2/4": "Needs solitude and recognition. Shines when called into action by trusted networks.",
        "2/5": "Naturally gifted and often projected upon. Best in advisory or consultative roles with boundaries.",
        "3/5": "Learns through trial and error. Offers realistic solutions from lived experiences.",
        "3/6": "Transitional teacher who gains wisdom with age. Evolves from experimenter to role model.",
        "4/6": "Influences through relationships. Long-term leadership emerges through social trust.",
        "4/1": "Grounded leader who balances logic and loyalty. Works well in educational and structured roles.",
        "5/1": "Fixer with foundational strength. Thrives where problem-solving and credibility are needed.",
        "5/2": "Practical and magnetic. Can lead quietly through well-timed interventions.",
        "6/2": "Role model by nature. Gains wisdom after mid-life and guides with embodied authenticity.",
        "6/3": "Deep experiential wisdom. Becomes a trusted teacher by living fully and reflectively."
    }
    if profile in profile_roles:
        roles.append(profile_roles[profile])
        description_lines.append(profile_descriptions[profile])

    # 4. Definition Logic
    definition_roles = {
        "Single Definition": "Independent Contributor / Focused Processor",
        "Split Definition": "Collaborator / Bridge-Builder / Connector",
        "Triple Split Definition": "Diverse Networker / Multi-Environment Operator",
        "Quadruple Split Definition": "Complex Systems Integrator / Deep Processor",
        "No Definition": "Environmental Barometer / Community Mirror"
    }
    definition_descriptions = {
        "Single Definition": "All energy centers are connected, leading to quick processing and a preference for independent work. Finds comfort in solitude.",
        "Split Definition": "Two or more distinct energy groups. Naturally drawn to others to 'bridge' their splits, benefiting from external input for wholeness and decision-making.",
        "Triple Split Definition": "Three distinct energy groups. Thrives in diverse social settings to achieve energetic wholeness and clarity. Avoids boredom with consistent limited energies.",
        "Quadruple Split Definition": "Four distinct energy groups (rare). Requires solitude to synchronize energies and is drawn to individuals who provide energetic completion.",
        "No Definition": "None of the energy centers are defined (Reflectors only). Highly permeable and absorbs significant environmental energy, requiring ample time for processing and discerning decisions."
    }
    if definition in definition_descriptions:
        roles.append(definition_roles.get(definition, "Unique Energetic Integrator"))
        description_lines.append(f"Definition Insight: {definition_descriptions[definition]}")

    # 5. Strategy Logic
    strategy_descriptions = {
        "To Inform": "For Manifestors: Informing others of intentions minimizes resistance and fosters peace.",
        "To Respond": "For Generators: Waiting for a gut response ensures sustained energy and fulfillment in aligned work.",
        "To Respond (and then Inform)": "For Manifesting Generators: Balances quick action with effective communication, reducing friction.",
        "To Wait for the Invitation": "For Projectors: Ensures their wisdom is valued and prevents bitterness from uninvited advice.",
        "To Wait a Lunar Cycle": "For Reflectors: Provides clarity and prevents disappointment from hasty decisions, especially in significant choices."
    }
    if strategy in strategy_descriptions:
        description_lines.append(f"Strategy Guideline: {strategy_descriptions[strategy]}")

    # 6. Not-Self Theme Logic
    not_self_theme_descriptions = {
        "Anger": "For Manifestors: Indicates feeling controlled or not informing. Realign by initiating and communicating your intentions.",
        "Frustration": "For Generators/Manifesting Generators: Signals initiating instead of responding, or engaging in unfulfilling work. Realign by waiting for your gut response and doing what genuinely lights you up.",
        "Bitterness": "For Projectors: Arises from offering uninvited advice or lack of recognition. Realign by waiting for correct invitations and practicing self-care.",
        "Disappointment": "For Reflectors: Surfaces when acting too quickly or being in unsupportive environments. Realign by waiting a full lunar cycle and curating your surroundings carefully."
    }
    if not_self_theme in not_self_theme_descriptions:
        description_lines.append(f"Not-Self Theme (Indicator of Misalignment): {not_self_theme_descriptions[not_self_theme]}")

    # 7. Incarnation Cross Logic
    incarnation_cross_angle_roles = {
        "Right Angle Crosses": "Personal Destiny Seeker / Individual Learner",
        "Left Angle Crosses": "Transpersonal Influencer / Community Weaver",
        "Juxtaposition Crosses": "Unique Stabilizer / Singular Contributor"
    }
    incarnation_cross_angle_descriptions = {
        "Right Angle Crosses": "Your life purpose focuses on personal destiny, learning and leading primarily through your own experiences and journey.",
        "Left Angle Crosses": "Your life purpose is transpersonal, meaning its fulfillment inherently requires interaction with and impact on others and the community.",
        "Juxtaposition Crosses": "Your life purpose is fixed and inherent to your being, often manifesting as a solitary yet stabilizing influence, irrespective of external interaction."
    }

    if incarnation_cross:
        angle = None
        if "Right Angle" in incarnation_cross:
            angle = "Right Angle Crosses"
        elif "Left Angle" in incarnation_cross:
            angle = "Left Angle Crosses"
        elif "Juxtaposition" in incarnation_cross:
            angle = "Juxtaposition Crosses"
        
        if angle and angle in incarnation_cross_angle_descriptions:
            roles.append(incarnation_cross_angle_roles.get(angle, "Life Purpose Integrator"))
            description_lines.append(f"Incarnation Cross ({incarnation_cross}): Your overarching life purpose is associated with {incarnation_cross_angle_descriptions[angle]} This deeper purpose unfolds over time and is best revealed when you align with your Human Design Strategy and Authority.")
        else:
            description_lines.append(f"Incarnation Cross ({incarnation_cross}): Represents your overarching life purpose or 'soul curriculum'. This deeper purpose unfolds over time, best revealed when you align with your Human Design Strategy and Authority.")

    return roles, "\n".join(description_lines)
