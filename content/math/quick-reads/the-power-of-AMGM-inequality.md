# The Power of AMGM Inequality

Considering the following function:

$$
f(x) = x + \frac{1}{x} \quad x \in \mathbb{R} \setminus \{0\}
$$

Find the minimal result of this function without using calculus.

using AMGM inequality

$$
\begin{aligned}
&\begin{array}{rcl}
\frac{1 + \frac{1}{x}}{2} & \stackrel{\text{AMGM}}{\geqslant} & \sqrt{x \frac{1}{x}} \\[0.35cm]
x + \frac{1}{x} & \geqslant & 2
\end{array} \\
&\implies y_{min} = 2
\end{aligned}
$$

Now we can solve for $x_{min}$

$$
\begin{gather*}
x + \frac{1}{x} = 2 \\
x^2 + 1 = 2x \\
x^2 - 2x + 1 = 0 \\
\implies x_{min} = 1
\end{gather*}
$$

So the minimum of this function is

$$
\begin{cases}
x_{min} = 1 \\
y_{min} = 2
\end{cases}
$$
