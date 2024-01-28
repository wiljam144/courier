# Definitions & Notation

1. **Points** are denoted by big letters, **lines** are denoted by small letters.
2. Sentences: *Point $J$ is on line $k$* and *line $k$ passes through point $J$*,
   are equal in meaning. Symbolically they are denoted by $J \in k$.
3. The only line passing through point $A \neq B$ is denoted by $AB$
   or $l_{AB}$. $h_{AB}$ denotes a **ray** starting in $A$ that passes through $B$.
4. **Segment** with ends $A$, $B$ is denoted by $\overline{AB}$. The length of
   segment $\overline{AB}$ is denoted by $|AB|$. The center of segment $\overline{AB}$
   is a point $M \in \overline{AB}$ such that $|AM| = |BM|$.
5. Two lines $k$ and $l$ are **equal**, when $\forall P \in k : P \in l$.
6. Two lines $k$ and $l$ are **parallel**, when $\forall P \in k : P \notin l$. This
   is denoted by $k \parallel l$. When lines $k$ and $l$ are not parallel,
   their relationship is denoted by $k \nparallel l$ and their (only) common point
   is denoted with $k \cdot l$.
7. **Circle** $\mathcal{K}(O; r)$ with **center** $O$ and **radius** $r$ is a set
   of all points of a plane, which distance from point $O$ is equal to $r$.
8. **Disc** $\mathcal{D}(O; r)$ with **center** $O$ and **radius** $r$ is a set
   of all points of a plane, which distance from point $O$ is less than or equal
   to $r$.
9. Two rays with a common start and with one of two areas, which these rays divide
   the plane into, is an **angle**. Rays that form the angle are it's **arms**,
   and their common start is the **vertex** of an angle. The area of a plane
   that is mentioned earlier is an **inside**. Angle is **zero**, when it has
   an empty inside, **straight** angle is an angle which arms are part of a single
   line, a **complete** angle is an angle which arms are equal. Angle with
   arms $h_{OA}$ and $h_{OB}$ is denoted by $\sphericalangle AOB$ (the context should
   be enough to decide on which of the two angles it's about). The measure
   of that angle is denoted with $|\sphericalangle AOB|$ To denote angles
   small greek letters are also going to be used, for example $\alpha$, $\beta$ etc.
10. Let's consider a circle with center in a vertex of an angle and a non-zero radius.
   Part of this circle contained inside of the considered angle is an **arch** of
   that circle. Arch of angle $\sphericalangle AOB$ is denoted with $\overset{\frown}{AB}$.
11. Angle of exactly $90\degree$ is called a **right angle**. Angle with measure
    lower than $90\degree$ is an **acute** angle. Angle with measure in
    range $(90\degree;180\degree)$ is an **obtuse** angle.
12. If any of four angles created by non-parallel lines $k$, $l$ is a right angle,
    then those lines are **perpendicular** to each other. This is denoted
    with $k \perp l$.
13. **Projection** of point $P$ on line $k$ is a common point of line $k$ with a
    perpendicular line to $k$ that passes through $P$. This is denoted with $P_{k}$.
14. **Distance** of point $P$ to line $k$ is a number $|PP_{k}|$. Denoted with $d(P;k)$
15. Two intersecting lines form two pairs of angles, which only common point is
    a point of intersection of those lines. Every such pair of angles is called
    a pair of **vertical** angles.
16. Two angles with a single common arm, and other arms being complementary rays
    of the same line, are **supplementary** angles.
17. A complete angle with both arms on a single line $k$ is a half-plane with
    edge $k$.
18. Ray $h_{OC}$ inside an angle $\sphericalangle AOB$ such
    that $|\sphericalangle AOC| = |\sphericalangle COB|$ is a **bisector** of
    angle $\sphericalangle AOB$.
19. Let $A$, $B$, $C$, be three points not lying on the same line. **Triangle**
    $ABC$ is a common area of three half-planes, from which one has an edge $AB$
    and point $C$ inside, second has an edge $BC$ and point $A$ inside and third
    has an edge $CA$ and point $B$ inside. Points $A$, $B$, $C$ are **vertices**
    of triangle ABC; segments $\overline{AB}$, $\overline{BC}$, $\overline{CA}$
    are **sides** of that triangle; angles $\sphericalangle ABC$,
    $\sphericalangle BCA$ $\sphericalangle CAB$ are **angles** of triangle.
    Triangle $ABC$ will be denoted with $\triangle ABC$.
20. Triangles $\triangle ABC$ and $\triangle A'B'C'$ are **congruent** if they
    have all sides of equal length, and their corresponding angles of equal measure.
21. Subsets of a geometric plane are called geometric **shapes**.
22. The area of a geometric shape $\mathcal{F}$ consisting of points $A$, $B$, $C$,
    with $[ABC]$ or with $P_{ABC}$.

**Definition 1.1** Geometric shape $\mathcal{F}$ is **convex**
when $\forall A,B \in \mathcal{F} : \overline{AB} \in \mathcal{F}$. Shown in
figure 1.1.
%%
\draw (0,0) ellipse (1.5cm and 1cm);
\draw[black,fill=black] (-0.5,0.3) circle(0.05cm);
\draw (-0.5,0.3) node[anchor=north]{$A$}
  -- (0.5,0.5) node[anchor=north]{$B$};
\draw[black,fill=black] (0.5,0.5) circle(0.05cm);
\node at (0,-1.5) {Figure 1.1};
%%
