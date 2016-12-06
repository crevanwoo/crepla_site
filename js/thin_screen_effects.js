  /**
     * [hover effect for portfolio]
     * @param {object} e [portfolio item]
     */
    function showPortfolioLogo(e) {
        e.target.querySelector('.portfolio .hover_logo').classList.add('active');
    }

    function hidePortfolioLogo(e) {
        e.target.querySelector('.portfolio .hover_logo').classList.remove('active');
    }